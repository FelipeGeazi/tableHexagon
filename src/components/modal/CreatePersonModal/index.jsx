import { useForm } from "react-hook-form";
import btnClose from "../../../assets/X.png";
import styles from "./style.module.scss";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

export const CreatePersonModal = ({
  openCreate,
  setOpenCreate,
  setFormData,
  sendDataToAPI,
  formData,
}) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  console.log(formData.nome);

  const submit = async (data) => {
    console.log(data);
    setFormData(data);
    await sendDataToAPI(data);
  };

  CreatePersonModal.propTypes = {
    setOpenCreate: PropTypes.func.isRequired,
    openCreate: PropTypes.bool.isRequired,
    setFormData: PropTypes.func.isRequired,
    sendDataToAPI: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
  };

  if (openCreate) {
    return (
      <div role="dialog">
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div>
              <h3 className="title modal">Cadastrar Pessoa</h3>
              <button onClick={() => setOpenCreate(false)}>
                <img src={btnClose} alt="close modal" />
              </button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className={styles.containerInput}>
                <label className="paragraph label">Digite seu nome</label>
                <input type="text" {...register("Nome")} placeholder="Felipe" />
              </div>
              <div className={styles.containerInput}>
                <label className="paragraph label">Digite sua idade</label>
                <input
                  label="Idade"
                  type="number"
                  {...register("Idade")}
                  placeholder="23"
                />
              </div>
              <div className={styles.containerSelect}>
                <label className="paragraph label">
                  Selecionar Estado Civil:
                </label>
                <select
                  className="paragraph placeholder"
                  {...register("EstadoCivil")}
                >
                  {" "}
                  <option value="">Selecione seu estado civil</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className={styles.containerInput}>
                <label className="paragraph label">Digite seu CPF</label>
                <input
                  label="CPF"
                  type="text"
                  {...register("CPF")}
                  placeholder="123456789"
                />
              </div>
              <div className={styles.containerInput}>
                <label className="paragraph label">Digite a sua Cidade:</label>
                <input
                  label="Cidade"
                  type="text"
                  {...register("Cidade")}
                  placeholder="Escreva uma tecnologia"
                />
              </div>

              <div className={styles.containerSelect}>
                <label className="paragraph label">Selecionar Estado:</label>
                <select
                  className="paragraph placeholder"
                  {...register("Estado")}
                >
                  <option value="AC">AC - Acre</option>
                  <option value="AL">AL - Alagoas</option>
                  <option value="AP">AP - Amapá</option>
                  <option value="AM">AM - Amazonas</option>
                  <option value="BA">BA - Bahia</option>
                  <option value="CE">CE - Ceará</option>
                  <option value="DF">DF - Distrito Federal</option>
                  <option value="ES">ES - Espírito Santo</option>
                  <option value="GO">GO - Goiás</option>
                  <option value="MA">MA - Maranhão</option>
                  <option value="MT">MT - Mato Grosso</option>
                  <option value="MS">MS - Mato Grosso do Sul</option>
                  <option value="MG">MG - Minas Gerais</option>
                  <option value="PA">PA - Pará</option>
                  <option value="PB">PB - Paraíba</option>
                  <option value="PR">PR - Paraná</option>
                  <option value="PE">PE - Pernambuco</option>
                  <option value="PI">PI - Piauí</option>
                  <option value="RJ">RJ - Rio de Janeiro</option>
                  <option value="RN">RN - Rio Grande do Norte</option>
                  <option value="RS">RS - Rio Grande do Sul</option>
                  <option value="RO">RO - Rondônia</option>
                  <option value="RR">RR - Roraima</option>
                  <option value="SC">SC - Santa Catarina</option>
                  <option value="SP">SP - São Paulo</option>
                  <option value="SE">SE - Sergipe</option>
                  <option value="TO">TO - Tocantins</option>
                </select>
              </div>
              <button className="btnFull pink" type="submit">
                Cadastrar Pessoa
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
