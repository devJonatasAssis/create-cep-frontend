import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";

import api from "../../services/api";

import "./style.css";

import logo from "../../images/logo.png";
import Input from "../../components/Form/Input";

export default function NovoCep({ history }) {
    const formRef = useRef(null);

    async function handleCep(data) {
        try {
            const validacaoForm = Yup.object().shape({
                zipcode: Yup.string()
                    .min(6, "O CEP tem que conter no mínimo 6 caractéres")
                    .required("O CEP é obrigatório!"),
                city: Yup.string().required("Preencha o nome da cidade!"),
            });

            await validacaoForm.validate(data, { abortEarly: false });
            formRef.current.setErrors({});
            const response = await api.post("zipcode", data);
            if (response.status) {
                history.push("/ceps");
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};

                error.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    }

    return (
        <div className="cep-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Trade Technology" />
                    <h1>Cadastrar novo CEP</h1>
                    <p>
                        Descreva o cep corretamente para poder cadastrá-lo na
                        nossa plataforma.
                    </p>
                    <Link className="back-link" to="/ceps">
                        <FiArrowLeft size={16} color="#3497D4" />
                        Voltar para Home.
                    </Link>
                </section>

                <Form className="form" ref={formRef} onSubmit={handleCep}>
                    <Input placeholder="Digite o CEP" name="zipcode" />
                    <Input placeholder="Digite o nome da cidade" name="city" />
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </Form>
            </div>
        </div>
    );
}
