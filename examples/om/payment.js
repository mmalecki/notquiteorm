class Payment {
  constructor ({ uuid, amount, paymentMethodId, basketUuid }) {
    this.uuid = uuid
    this.amount = amount
    this.paymentMethodId = paymentMethodId
    this.basketUuid = basketUuid
  }
}

Payment.fields = {
  uuid: { column: 'uuid', },
  amount: { column: 'amount', schema: { type: 'string' } },
  paymentMethodId: { column: 'payment_method_id', },
  basketUuid: { column: 'basket_uuid' },
}

Payment.tableName = 'payments';

module.exports = Payment
