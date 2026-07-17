#!/usr/bin/env bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

run_step() {
  local name="$1"
  shift
  printf "${YELLOW}  Running %-32s${NC}" "${name}..."
  if "$@" > /dev/null 2>&1; then
    printf "${GREEN} ✓ PASS${NC}\n"
    PASS=$((PASS + 1))
  else
    printf "${RED} ✗ FAIL${NC}\n"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "🔍 Pre-push CI Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

run_step "Install (frozen lockfile)" pnpm install --frozen-lockfile
run_step "Format check" pnpm format:check
run_step "Lint" pnpm lint
run_step "Type check" pnpm typecheck
run_step "Tests" pnpm test
run_step "Build" pnpm build

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "  ${GREEN}Passed: %d  ${RED}Failed: %d${NC}\n" "$PASS" "$FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ "$FAIL" -eq 0 ] || exit 1