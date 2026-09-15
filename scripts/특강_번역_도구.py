# -*- coding: utf-8 -*-
"""
선배 특강 다국어 — 번역 문자열 추출 / 되붓기 / 구조 점검

왜 이렇게 하나:
  본문이 한 편에 1만 자가 넘는다. 번역본 JSON 을 통째로 손으로 쓰면 «구조»가 어긋난다
  (챕터 하나가 빠지거나, 영상 ID 가 번역되거나, 표의 행 수가 달라지거나).
  그래서 번역은 «문자열 배열 하나»로만 주고받고, 구조는 항상 ko.json 에서 복사한다.
  → 번역이 틀릴 수는 있어도 «화면이 깨질» 수는 없다.

쓰는 법:
  python scripts/특강_번역_도구.py extract  choijunhyeok      # _번역작업/choijunhyeok.ko.json 생성
  python scripts/특강_번역_도구.py inflate  choijunhyeok en   # _번역작업/choijunhyeok.en.txt → src/.../en.json
  python scripts/특강_번역_도구.py check                       # 전 언어 구조·개수 점검

번역 파일 형식(.txt): 한 줄에 「번호<탭>문자열」. 번호는 ko 추출본의 번호를 그대로 쓴다.
  번호를 달면 몇 조각으로 나눠 쓰든 제자리를 찾고, 빠진 줄·중복을 정확히 집어낸다.
  줄바꿈이 필요한 문자열은 \\n 으로 적는다(실제 개행은 줄 구분자라 쓸 수 없다).
"""
import io
import json
import os
import sys

# 윈도우 콘솔 기본 코덱(cp949)은 ✅·⛔ 를 못 찍고 죽는다 — 출력만 UTF-8 로 갈아 끼운다
if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LECT = os.path.join(ROOT, "src", "content", "lectures")
WORK = os.path.join(ROOT, "_번역작업")
LANGS = ["en", "my", "mn", "vi", "th", "ne"]
SLUGS = ["choijunhyeok", "osihye"]

# 번역하지 않는 자리 — 기계 식별자·주소·번호·블록 타입('t': p/h3/quote/ul/…)
SKIP_KEYS = {"lang", "slug", "sourceUrl", "video", "no", "id", "t"}


def walk(node, path, out, translate):
    """JSON 을 정해진 순서로 훑으며 번역 대상 문자열을 모은다(추출) / 갈아 끼운다(되붓기)."""
    if isinstance(node, dict):
        for k in node:
            if k in SKIP_KEYS:
                continue
            if path == ("contact",) and k == "value":
                continue  # 이메일 주소
            node[k] = walk(node[k], path + (k,), out, translate)
        return node
    if isinstance(node, list):
        return [walk(v, path + (str(i),), out, translate) for i, v in enumerate(node)]
    if isinstance(node, str):
        if translate is None:
            out.append(node)
            return node
        idx = len(out)
        out.append(node)
        return translate[idx] if idx < len(translate) else node
    return node


def load_ko(slug):
    with open(os.path.join(LECT, slug, "ko.json"), encoding="utf-8") as f:
        return json.load(f)


def cmd_extract(slug):
    os.makedirs(WORK, exist_ok=True)
    strings = []
    walk(load_ko(slug), (), strings, None)
    p = os.path.join(WORK, f"{slug}.ko.txt")
    with open(p, "w", encoding="utf-8") as f:
        f.write(
            "\n".join(
                "%04d\t%s" % (i, s.replace("\n", "\\n")) for i, s in enumerate(strings)
            )
        )
    print(f"{slug}: {len(strings)}줄 → {p}")


def cmd_inflate(slug, lang):
    src = os.path.join(WORK, f"{slug}.{lang}.txt")
    with open(src, encoding="utf-8") as f:
        raw = [l for l in f.read().split("\n") if l.strip()]

    ko_strings = []
    walk(load_ko(slug), (), ko_strings, None)

    lines = [None] * len(ko_strings)
    dup = []
    for l in raw:
        if "\t" not in l:
            print("⛔ 「번호<탭>문자열」 형식이 아닌 줄: " + l[:60])
            sys.exit(1)
        num, text = l.split("\t", 1)
        i = int(num)
        if i >= len(ko_strings):
            print("⛔ 범위를 넘는 번호 %d (최대 %d)" % (i, len(ko_strings) - 1))
            sys.exit(1)
        if lines[i] is not None:
            dup.append(i)
        lines[i] = text.replace("\\n", "\n")

    missing = [i for i, v in enumerate(lines) if v is None]
    if missing or dup:
        if missing:
            print("⛔ %s.%s: 빠진 줄 %d개 — %s" % (slug, lang, len(missing), missing[:20]))
        if dup:
            print("⛔ %s.%s: 중복 번호 %d개 — %s" % (slug, lang, len(dup), dup[:20]))
        sys.exit(1)

    data = load_ko(slug)
    data["lang"] = lang
    walk(data, (), [], lines)
    dst = os.path.join(LECT, slug, f"{lang}.json")
    with open(dst, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print(f"{slug}.{lang}: {len(lines)}줄 → {dst}")


def struct(node, path=()):
    """구조 지문 — 키 이름·배열 길이·블록 타입만 남기고 문자열 내용은 버린다."""
    if isinstance(node, dict):
        return {k: struct(v, path + (k,)) for k, v in sorted(node.items())}
    if isinstance(node, list):
        return [struct(v, path + (str(i),)) for i, v in enumerate(node)]
    if isinstance(node, str):
        return "·"
    return node


def cmd_check():
    bad = 0
    for slug in SLUGS:
        ko = load_ko(slug)
        ko_n = []
        walk(load_ko(slug), (), ko_n, None)
        ref = struct(ko)
        for lang in LANGS:
            p = os.path.join(LECT, slug, f"{lang}.json")
            if not os.path.exists(p):
                print(f"… {slug}/{lang}.json 없음 (한국어로 폴백됨)")
                continue
            with open(p, encoding="utf-8") as f:
                d = json.load(f)
            n = []
            walk(json.loads(json.dumps(d)), (), n, None)
            ok_struct = struct(d) == ref
            ok_count = len(n) == len(ko_n)
            empt = sum(1 for s in n if not s.strip())
            same = sum(1 for a, b in zip(n, ko_n) if a == b)
            mark = "✅" if (ok_struct and ok_count and empt == 0) else "⛔"
            print(
                f"{mark} {slug}/{lang}: 구조 {'일치' if ok_struct else '불일치'} · "
                f"문자열 {len(n)}/{len(ko_n)} · 빈칸 {empt} · 한국어와 동일 {same}"
            )
            if not (ok_struct and ok_count and empt == 0):
                bad += 1
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
    elif a[0] == "extract":
        for s in (a[1:] or SLUGS):
            cmd_extract(s)
    elif a[0] == "inflate":
        cmd_inflate(a[1], a[2])
    elif a[0] == "check":
        cmd_check()
    else:
        print(__doc__)
