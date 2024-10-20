import { useEffect, useState } from "react";
import classes from "./ModalDetail.module.css";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
function ModalDetail(props) {
  const [allCours, setAllCours] = useState([]);
  const token = localStorage.getItem("tokengoat");
  const quizInfo = ["Nome de quizz :", "Module : ", "Année : ", "Cours : "];
  function cancelHandler(props) {
    props.onCancel();
  }
  //load les cours**********************************************
  const loadModulesSelet = async () => {
    const coursId = JSON.parse(props.detailQuizz.selectMultipleCours);
    for (let inc = 0; inc < coursId.length; inc++) {
      const result = await axios.get(
        `https://goatqcm-instance.com/cours/${coursId[0]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result.data);
      setAllCours((cour) => [...cour, result.data.coursName]);
    }
  };
  //*********************************************************************** */
  useEffect(() => {
    loadModulesSelet();
    console.log(JSON.parse(props.detailQuizz.selectMultipleCours).length);
  }, []);
  //************************************************************* */

  return (
    <div className={`${classes.modal} `}>
      <div className={classes.infocontent}>
        <ul className={`${classes.infonames} list-group`}>
          <li className="list-group-item">{quizInfo[0]}</li>
          <li className="list-group-item">{quizInfo[1]}</li>
          <li className="list-group-item">{quizInfo[2]}</li>
          <li className="list-group-item">{quizInfo[3]}</li>
        </ul>
        <ul className={`${classes.infovalue} list-group`}>
          <li className="list-group-item">
            {" "}
            {props.detailQuizz.nameQcmQuizz}
            {props.detailQuizz.nameCasCliniqueQuizz}
            {props.detailQuizz.nameQcmCasCliniqueQuizz}
          </li>
          <li className="list-group-item"> {props.detailQuizz.moduleName}</li>
          <ul className={`${classes.year} list-group`}>
            <li class="list-group-item">
              {props.detailQuizz.minYearQcm} / {props.detailQuizz.maxYearQcm}
            </li>
          </ul>
          <li className={`${classes.listecours} list-group-item`}>
            {" "}
            - {allCours}.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalDetail;
