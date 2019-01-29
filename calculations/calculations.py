def percent(curr_marg_tax_rate):
    return curr_marg_tax_rate / 100.0


def after_tax(deposit_amount, curr_marg_tax_rate):
    tfsa = (1 - percent(curr_marg_tax_rate)) * deposit_amount
    rrsp = deposit_amount * 1.0

    return {'TFSA': tfsa, 'RRSP': rrsp}


def future_value(after_tax, return_on_investment, years):
    future = {}

    for k, v in after_tax.items():
        future[k] = v * (1 + percent(return_on_investment)) ** years

    return future


def tax_on_withdrawal(future_value, avg_tax_rate_in_ret):
    taxes = {}

    for k, v in future_value.items():
        if k == 'TFSA':
            taxes[k] = 0.0
            continue
        taxes[k] = v * percent(avg_tax_rate_in_ret)

    return taxes


def after_taxes_future_value(future_value, taxes_on_withdrawal):
    future = {}

    for k, v in future_value.items():
        future[k] = future_value[k] - taxes_on_withdrawal[k]

    return future
