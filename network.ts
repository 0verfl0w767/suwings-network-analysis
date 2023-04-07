/**
 *    ____                  __________
 *   / __ \_   _____  _____/ __/ / __ \_      __
 *  / / / / | / / _ \/ ___/ /_/ / / / / | /| / /
 * / /_/ /| |/ /  __/ /  / __/ / /_/ /| |/ |/ /
 * \____/ |___/\___/_/  /_/ /_/\____/ |__/|__/
 *
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 *
 * @author 0verfl0w767
 * @link https://github.com/0verfl0w767
 * @license MIT LICENSE
 *
 */
import * as fs from "fs";
import { js2xml, xml2json, xml2js } from "xml-js";

const settings = {
  FILE_NAME: "컴퓨터공학부",
  COLG_CD: "00126",
  FCLT_CD: "00160",
};

const baseXML = fs.readFileSync("./request/xml/base.xml", "utf-8");

let rawJSON = xml2js(baseXML);

for (let index in rawJSON.elements[0].elements) {
  if (rawJSON.elements[0].elements[index].type === "element") {
    if (rawJSON.elements[0].elements[index].name === "COLG_CD") {
      rawJSON.elements[0].elements[index].attributes.value =
        settings["COLG_CD"];
    }
    if (rawJSON.elements[0].elements[index].name === "FCLT_CD") {
      rawJSON.elements[0].elements[index].attributes.value =
        settings["FCLT_CD"];
    }
  }
}

const settingXML = js2xml(rawJSON);

const getResponse = async () => {
  const response = await fetch(
    "https://suwings.syu.ac.kr/websquare/engine/proworks/callServletService.jsp",
    {
      method: "POST",
      body: settingXML,
      headers: { "Content-Type": "application/xml; charset=UTF-8" },
    }
  );

  if (!response.ok) {
    response.text().then((text) => {
      throw new Error(text);
    });
  }

  const rawXML = await response.text();
  const rawJSON = xml2json(rawXML);

  fs.writeFile(
    "./response/xml/" + settings["FILE_NAME"] + ".xml",
    rawXML,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  fs.writeFile(
    "./response/json/" + settings["FILE_NAME"] + ".json",
    JSON.stringify(JSON.parse(rawJSON), null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

getResponse();
