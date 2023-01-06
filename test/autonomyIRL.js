"use strict";

const test = require("tape");
const autonomyIRL = require("../index.js");

test("test autonomyIRL", function (t) {
  let s = autonomyIRL.getAddress("Tezos");
  t.notEqual(s, null);
  t.end();
});
