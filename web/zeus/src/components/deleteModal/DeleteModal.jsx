import Modal from "react-modal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./styles.css";

function DeleteModal(props) {
    return (
        <div id="delete-modal">
            <Modal
                isOpen={props.showDeleteModal}
                onRequestClose={props.handleCancelDeleteModal}
                overlayClassName="ReactModal__Overlay"
                className="ReactModal__Content"
            >
                <p>
                    Tem certeza que deseja deletar a ração {props.name} do dia{" "}
                    {format(new Date(props.date), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                    })}{" "}
                    ?
                </p>
                <div>
                    <button onClick={props.handleDeleteCard}>Sim</button>
                    <button onClick={props.handleCancelDeleteModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteModal;
