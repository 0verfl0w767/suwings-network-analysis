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
import { xml2json } from "xml-js";

const xmlPOST = `
  <rqM0_F0 task="system.commonTask" action="comSelect" xda="academic.ac.ac03.ac03_20040305_m_M0_F0_xda" con="sudev">
    <FCLT_GSCH_DIV_CD value="1"/>
    <OPEN_YY value="2023"/>
    <OPEN_SHTM_CD value="10"/>
    <COLG_CD value="00126"/>
    <FCLT_CD value="00160"/>
    <MJR_CD value=""/>
    <SBJT_CD value=""/>
    <EDUCUR_CORS_SHYS_CD value=""/>
    <CPTN_DIV_CD value=""/>
    <CTNCCH_FLD_DIV_CD value=""/>     	
    <EMP_NO value=""/>
    <DAY_CD value=""/>
    <LTTM_CD value=""/>
    <SPC_CD value=""/>
    <KOR_SBJT_NM value=""/>
    <LANG_GUBUN value="K"/>
    <CONC_SHTM_TN value=""/>
    <LCTPT value=""/>
    <LECT_NO value=""/>
  </rqM0_F0>
`;

const getResponse = async () => {
  const response = await fetch(
    "https://suwings.syu.ac.kr/websquare/engine/proworks/callServletService.jsp",
    {
      method: "POST",
      body: xmlPOST,
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

  fs.writeFile("network.xml", rawXML, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.writeFile(
    "network.json",
    JSON.stringify(JSON.parse(rawJSON), null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

getResponse();
