#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask_cors import CORS
from flask import Flask
from flask import Response
from flask import request
from calculations import calculations
import json

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    status = 200
    infos = {}

    return Response(json.dumps(infos), status=status, mimetype='application/json')


@app.route('/compare', methods=['POST'])
def compare():
    curr_marg_tax_rate = int(request.form['curr_marg_tax_rate'])
    avg_tax_rate_in_ret = int(request.form['avg_tax_rate_in_ret'])
    deposit_amount = int(request.form['deposit_amount'])
    years = int(request.form['years'])
    return_on_investment = int(request.form['return_on_investment'])
    inflation_rate = int(request.form['inflation_rate'])

    after_tax = calculations.after_tax(deposit_amount, curr_marg_tax_rate)
    future_value = calculations.future_value(
        after_tax, return_on_investment, years)
    tax_on_withdrawal = calculations.tax_on_withdrawal(
        future_value, avg_tax_rate_in_ret)
    after_taxes_future_value = calculations.after_taxes_future_value(
        future_value, tax_on_withdrawal)

    status = 200
    infos = {}

    infos.update({'after_tax': after_tax})
    infos.update({'future_value': future_value})
    infos.update({'tax_on_withdrawal': tax_on_withdrawal})
    infos.update({'after_taxes_future_value': after_taxes_future_value})

    return Response(json.dumps(infos), status=status, mimetype='application/json')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
