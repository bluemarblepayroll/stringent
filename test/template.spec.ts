/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect } from "chai";
import { Template } from "../lib/template";

describe("Template#variables", () => {
  it("should properly be extracted", () => {
    const tests = [
      [
        "",
        [],
      ],
      [
        null,
        [],
      ],
      [
        1,
        [],
      ],
      [
        false,
        [],
      ],
      [
        "string with none",
        [],
      ],
      [
        "{one {inside} another one}",
        [
          {
            arg: null,
            formatter: "",
            name: "one {inside",
            value: "one {inside",
          },
        ],
      ],  // this type of use is not supported
      [ "matt {is} a {monkeys} uncle.",
        [
          {
            arg: null,
            formatter: "",
            name: "is",
            value: "is",
          },
          {
            arg: null,
            formatter: "",
            name: "monkeys",
            value: "monkeys",
          },
        ],
      ],
      [ "matt {is::date::short} a {monkeys::timeAgo} uncle.",
        [
          {
            arg: "short",
            formatter: "date",
            name: "is",
            value: "is::date::short",
          },
          {
            arg: null,
            formatter: "timeAgo",
            name: "monkeys",
            value: "monkeys::timeAgo",
          },
        ],
      ],
    ];

    tests.forEach( (x) => {
      const t = new Template((x[0] || "").toString());

      expect(t.placeholders()).to.have.lengthOf((x[1] as any[]).length);
      expect(t.placeholders()).to.deep.equal(x[1]);
    });
  });
});
