#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

path="http://localhost:5000/compare"

curr_marg_tax_rate=40
avg_tax_rate_in_ret=30
deposit_amount=1000
years=20
return_on_investment=5
inflation_rate=3

curl -s -X POST \
  -d "curr_marg_tax_rate=${curr_marg_tax_rate}&avg_tax_rate_in_ret=${avg_tax_rate_in_ret}&deposit_amount=${deposit_amount}&years=${years}&return_on_investment=${return_on_investment}&inflation_rate=${inflation_rate}" \
  ${path}

