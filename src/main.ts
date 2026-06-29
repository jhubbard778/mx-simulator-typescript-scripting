// Write your script here
mx.message(Number.EPSILON.toString());
mx.message(Number.MAX_SAFE_INTEGER.toString());
mx.message(Number.MIN_SAFE_INTEGER.toString());
mx.message(Number.isFinite("123").toString());
mx.message(Number.isFinite(123).toString());

mx.message(Number.isInteger(123).toString());
mx.message(Number.isInteger(12.3).toString());
mx.message(Number.isSafeInteger(123).toString());
mx.message(Number.isSafeInteger(12.3).toString());

mx.message(Number.parseInt("123").toString());
mx.message(Number.parseFloat("12.3").toString());