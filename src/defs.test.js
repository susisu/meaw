/* eslint-env mocha */

import { expect } from "chai";

import Defs from "./defs.js";

describe("defs", () => {
  it("should be ordered and complete", () => {
    const minCodePoint = 0x0000;
    const maxCodePoint = 0x10FFFF;
    const propValues   = ["A", "F", "H", "N", "Na", "W"];
    let prev = null;
    for (const def of Defs) {
      expect(def).to.have.property("start")
        .that.is.within(minCodePoint, maxCodePoint);
      expect(def).to.have.property("end")
        .that.is.within(minCodePoint, maxCodePoint);
      expect(def).to.have.property("prop")
        .that.is.oneOf(propValues);
      if (prev) {
        expect(def.start).to.equal(prev.end + 1);
        expect(def.prop).not.to.equal(prev.prop);
      }
      prev = def;
    }
    expect(Defs[0].start).to.equal(minCodePoint);
    expect(Defs[Defs.length - 1].end).to.equal(maxCodePoint);
  });
});
