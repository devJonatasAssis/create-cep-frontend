import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./style.css";

import logo from "../../images/logo.png";

export default function ListCeps() {
    const [ceps, setCeps] = useState([]);

    useEffect(() => {
        async function buscarCeps() {
            const response = await api.get("zipcode");
            setCeps(response.data);
        }

        buscarCeps();
    }, []);

    async function deletarCep(id) {
        try {
            await api.delete(`zipcode/${id}`);
            setCeps(ceps.filter((cep) => cep._id !== id));
            alert("Excluído com Sucesso");
        } catch (error) {
            alert("Erro ao deletar cep! Tente novamente");
        }
    }

    return (
        <div className="list-container">
            <header>
                <img src={logo} alt="Be the Hero" />

                <Link className="button" to="/cep/novo">
                    Cadastrar novo CEP
                </Link>

                <button type="button">
                    <FiPower size={28} color="#3497D4" />
                </button>
            </header>

            <h1>CEP's Cadastrados</h1>

            <ul>
                {ceps.map((cep) => (
                    <li key={cep._id}>
                        <strong>CEP:</strong>
                        <p>{cep.zipcode}</p>
                        <strong>Cidade:</strong>
                        <p>{cep.city}</p>

                        <button
                            type="button"
                            onClick={() => deletarCep(cep._id)}
                        >
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
