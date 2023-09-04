import button from "../../assets/Button Plus.svg";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { CreatePersonModal } from "../modal/CreatePersonModal";
import { api } from "../../services/api";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { UpdatePersonModal } from "../modal/EdithPersonModal";
import "react-toastify/dist/ReactToastify.css";

export const TableList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [personList, setPersonList] = useState([]);
  const [errors, setErrors] = useState(null); // Adicione um estado para controlar
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Defina o número de itens por páginaerros
  const [formData, setFormData] = useState({});
  const [updatePerson, setUpdatePerson] = useState({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const funcOpenUpdate = (data) => {
    setOpenUpdate(!openUpdate);
    setUpdatePerson(data);
  };

  const handleUpdate = async (data) => {
    console.log(updatePerson.id);
    console.log(data);

    const newData = {
      id: updatePerson.id,
      nome: data.nome || updatePerson.nome,
      estadoCivil: data.estadoCivil || updatePerson.estadoCivil,
      idade: data.idade || updatePerson.idade,
      cpf: data.cpf || updatePerson.cpf,
      cidade: data.cidade || updatePerson.cidade,
      estado: data.estado || updatePerson.estado,
    };
    console.log(newData);

    if (!newData.id) {
      console.log(updatePerson);
      console.log(data);
      console.error("ID da pessoa não especificado.");
      return;
    }
    try {
      // Faça a requisição para atualizar a pessoa na API usando data
      const response = await api.put(`/api/pessoas/${newData.id}`, newData);

      console.log(response.status, response);
      fetchPersonList();
      setOpenUpdate(false);
      setUpdatePerson({});
      toast.success(
        `Parabéns ${newData.id} com ID ${newData.id}, você foi  editado com sucesso`
      );
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      toast.error(
        `Erro ao atualizar novo nome ${data.nome}, o ${updatePerson.nome} com id: ${updatePerson.id}, pedimos desculpas.`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  // Função para buscar a lista de pessoas na API
  const fetchPersonList = async () => {
    try {
      const response = await api.get("/api/pessoas");
      if (response && response.status === 200) {
        setPersonList(response.data);
      } else {
        console.error("Erro ao buscar dados da API.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const sendDataToAPI = async (newData) => {
    try {
      const response = await api.post("api/Pessoas", newData);
      console.log(newData);

      if (response.status === 201) {
        const createdPerson = response.data;
        const updatedPersonList = [...personList, createdPerson];
        setPersonList(updatedPersonList);
        fetchPersonList();
        setOpenCreate(false);
        toast.success(`Pessoa com ID ${response.data.id} criada com sucesso`);
        setFormData({});
      } else {
        // Trate erros de resposta da API
        console.error("Erro Após o cadastro.");
      }
    } catch (error) {
      // Trate erros de rede ou outros erros
      console.error("Erro ao enviar os dados para a API:", error);
      console.log(formData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/pessoas");
        if (response && response.status === 200) {
          setPersonList(response.data);
        } else {
          console.error("Erro ao buscar dados da API.");
        }
      } catch (error) {
        setErrors("Erro ao buscar dados da API: " + error.message);
        console.log(errors);
        toast.error(`Erro ao renderizar lista: ${error.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  }, []); // O segundo argumento vazio [] garante que a função seja executada apenas uma vez após a montagem do componente

  const handleDelete = async (id) => {
    try {
      // Faça uma requisição DELETE para a API, passando o ID da pessoa a ser excluída
      const response = await api.delete(`/api/pessoas/${id}`);

      // Verifique se a exclusão foi bem-sucedida
      if (response.status === 204) {
        // Atualize a lista de pessoas após a exclusão
        const updatedPersonList = personList.filter(
          (person) => person.id !== id
        );
        setPersonList(updatedPersonList);
        // Exiba uma notificação de sucesso
        toast.success(`Pessoa com ID ${id} excluída com sucesso.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.error("Erro ao excluir pessoa.");
      }
    } catch (error) {
      console.error(`Erro ao excluir pessoa com ID ${id}:`, error);
    }
  };

  return (
    <>
      <table className={styles.flexBox}>
        <thead className={styles.flexTitle}>
          <th className="title two">id</th>
          <th className="title two">Nome</th>
          <th className="title two">Idade</th>
          <th className="title two">Estado Civil</th>
          <th className="title two">CPF</th>
          <th className="title two">Cidade</th>
          <th className="title two">Estado</th>
          <button>
            <img
              src={button}
              alt="Adicionar Pessoa"
              onClick={() => setOpenCreate(!openCreate)}
            />
          </button>
        </thead>

        <tbody className={styles.ulBox}>
          {currentItems.map((person) => (
            <tr key={person.id} className={styles.flexRow}>
              <td className="title three">{person.id}</td>
              <td className="title four">{person.nome}</td>
              <td className="title four">{person.idade}</td>
              <td className="title four">{person.estadoCivil}</td>
              <td className="title four">{person.cpf}</td>
              <td className="title four">{person.cidade}</td>
              <td className="title four">{person.estado}</td>
              <div className="title three">
                <button
                  className="title three"
                  title="Editar"
                  aria-label="edit"
                >
                  <MdEdit size={19} onClick={() => funcOpenUpdate(person)} />
                </button>
                <button
                  className="title three"
                  title="Remover"
                  aria-label="remove"
                >
                  <MdDelete size={19} onClick={() => handleDelete(person.id)} />
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= personList.length}
        >
          Próxima
        </button>
      </div>

      <CreatePersonModal
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        setFormData={setFormData}
        sendDataToAPI={sendDataToAPI}
        formData={formData}
      />
      <UpdatePersonModal
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        handleUpdate={handleUpdate}
        updatePerson={updatePerson}
        setUpdatePerson={setUpdatePerson}
      />
    </>
  );
};
