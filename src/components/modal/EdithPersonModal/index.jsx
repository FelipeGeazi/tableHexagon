import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.scss";
import btnClose from "../../../assets/X.png";
import PropTypes from "prop-types";

export const UpdatePersonModal = ({
  openUpdate,
  setOpenUpdate,
  handleUpdate,
  updatePerson,
  setUpdatePerson,
}) => {
  UpdatePersonModal.propTypes = {
    setOpenUpdate: PropTypes.func.isRequired,
    openUpdate: PropTypes.bool.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    updatePerson: PropTypes.object.isRequired,
    setUpdatePerson: PropTypes.func.isRequired,
  };

  const { register, handleSubmit } = useForm({
    values: {
      nome: updatePerson.Nome,
      idade: updatePerson.Idade,
      estadoCivil: updatePerson.EstadoCivil,
      cpf: updatePerson.cpf,
      cidade: updatePerson.cidade,
      estado: updatePerson.estado,
    },
  });

  const submit = (data) => {
    setUpdatePerson({
      ...updatePerson,
      data,
    });

    console.log(data);
    console.log(updatePerson);
    handleUpdate(data);
  };

  /* const submit = async (data) => {
    console.log(data);
    await handleUpdate(updatePerson);
    setOpenUpdate(false);
  }; */
  const close = () => {
    setOpenUpdate(false);
    setUpdatePerson({});
  };

  if (openUpdate)
    return (
      <div role="dialog">
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div>
              <h3 className="title modal">Atualizar Pessoa</h3>
              <button onClick={() => close()}>
                <img src={btnClose} alt="close modal" />
              </button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className={styles.containerInput}>
                <label className="paragraph label">Nome</label>
                <input type="text" placeholder="Felipe" {...register("nome")} />
              </div>
              <div className={styles.containerInput}>
                <label className="paragraph label">Idade</label>
                <input type="number" {...register("idade")} placeholder="23" />
              </div>
              <div className={styles.containerSelect}>
                <label className="paragraph label">Estado Civil</label>
                <select {...register("estadoCivil")}>
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
                <label className="paragraph label">CPF</label>
                <input
                  type="text"
                  {...register("cpf")}
                  placeholder="123456789"
                />
              </div>
              <div className={styles.containerInput}>
                <label className="paragraph label">Cidade</label>
                <input
                  type="text"
                  placeholder="Escreva uma tecnologia"
                  {...register("cidade")}
                />
              </div>
              <div className={styles.containerSelect}>
                <label className="paragraph label">Estado</label>
                <select {...register("estado")}>
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
                Atualizar Pessoa
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};
