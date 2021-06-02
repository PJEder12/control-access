import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Axios from "axios";

//CSS
import "./style/History.css";

const History = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [history_information, set_history_information] = useState([]);
  const [active_use_effect, set_active_use_effect] = useState(false);
  const history_url = "http://localhost:52000/api/history";
  const filter_history_url = "http://localhost:52000/api/filterhistory";

  useEffect(() => {
    Axios.get(history_url).then((response) => {
      set_history_information(response.data);
    });
  }, [active_use_effect]);

  const handle_filter = () => {
    const startDateRef = document.getElementById("start-date-picker");
    const endDateRef = document.getElementById("end-date-picker");

    const dates_filter = {
      fecha_inicio: startDateRef.value,
      fecha_final: endDateRef.value,
    };

    Axios.post(filter_history_url, dates_filter).then((response) => {
      set_history_information(response.data);
    });
  };

  const handle_delete_filter = () => {
    setStartDate(null);
    setEndDate(null);
    set_active_use_effect(!active_use_effect);
  }

  return (
    <div className="history_container">
      <h1>Historial</h1>
      <p>
        En esta sección puedes revisar el historial de los ingresos y salidas de
        las personas. Además, puedes filtrar por un rango de fechas.
      </p>
      <div className="filter_history_section">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona fecha inicial"
          className="start-date-picker"
          id="start-date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona fecha final"
          className="end-date-picker"
          id="end-date-picker"
        />
        <Button variant="danger" type="submit" onClick={handle_filter}>
          Filtrar por fecha
        </Button>
        <Button variant="outline-info" type="submit" onClick={handle_delete_filter}>
          Quitar filtro
        </Button>
      </div>
      <section className="cards_history_section">
        {history_information.map((info) => {
          return (
            <div className="history_card">
              <p>
                <span>Nombre:</span> {info.nombre}
              </p>
              <p>
                <span>Fecha de ingreso:</span> {info.hora_inicio}
              </p>
              <p>
                <span>Fecha de salida:</span>
                {info.hora_salida ? info.hora_salida : "No ha salido aún"}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default withRouter(History);
