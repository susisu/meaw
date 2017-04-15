/* eslint-env mocha */

import { expect } from "chai";

import Defs from "./defs.js";

describe("defs", () => {
  it("should be ordered and complete", () => {
    const propValues = ["A", "F", "H", "N", "Na", "W"];
    let prev = null;
    for (const def of Defs) {
      expect(def).has.a.property("start").that.is.a("number");
      expect(def).has.a.property("end").that.is.a("number");
      expect(def).has.a.property("prop").that.is.oneOf(propValues);
      if (prev) {
        expect(def.start).to.equal(prev.end + 1);
        expect(def.prop).not.to.equal(prev.prop);
      }
      prev = def;
    }
    expect(Defs[0].start).to.equal(0x0000);
    expect(Defs[Defs.length - 1].end).to.equal(0x10FFFF);
  });
});
