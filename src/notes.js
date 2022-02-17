/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { BiAddToQueue } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { TiDelete } from "react-icons/ti";
import { AiOutlineFileSearch } from "react-icons/ai";
import AddModal from "./addModal";
import UpdateModal from "./updateModal";
import { TextField } from "@material-ui/core";
import { DataContext } from "./Provider/DataProvider";
import { v4 as uuidv4 } from "uuid";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteData, setnoteData] = useState({ title: "", desc: "", noteId: "" });
  const [openModal, setopenModal] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState({
    show: false,
    id: "",
  });
  const [opeUpdatemodal, setopeUpdatemodal] = useState(false);
  const [SearchItemValue, setSearchItemValue] = useState("");

  const { state, dispatch } = useContext(DataContext);

  const addNote = (values, event) => {
    if (values.title && values.desc) {
      const valuedsWithId = { ...values, id: uuidv4.apply() };
      dispatch({
        mode: "add",
        data: valuedsWithId,
      });
    }
    event.resetForm();
    setopenModal(false);
  };

  const editNote = (values, event) => {
    setopeUpdatemodal(false);
    console.log(values);
    dispatch({
      mode: "update",
      data: values,
    });
    event.resetForm();
  };

  const searchitem = (e) => {
    if (SearchItemValue) {
      const searchValue = SearchItemValue;
      var storednotes = state.notes || [];
      const filteredCountries = storednotes.filter((note) => {
        return (
          note.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
      });
      setNotes(filteredCountries);
    } else {
      setNotes(state.notes);
    }
  };

  const viewNote = (note, id) => {
    setnoteData(note);
    setopeUpdatemodal(true);
  };

  useEffect(() => {
    searchitem(SearchItemValue);
  }, [SearchItemValue, state.notes]);

  return (
    <>
      <div className="text-dark text-center">
        You Can Run This Website Without Internet And Also Install In Mobile
      </div>

      <h1 className="text-dark text-center p-3 mt-3">Notes</h1>
      <div className="container">
        <div className="form-group">
          <TextField
          autoComplete="off"
            id="seach-field"
            label={<AiOutlineFileSearch size={24} />}
            className="w-100"
            variant="outlined"
            placeholder="Enter Note Title"
            onChange={(e) => setSearchItemValue(e.target.value)}
          />
        </div>
        <AddModal
          openModal={openModal}
          setopenModal={setopenModal}
          addNote={addNote}
        />
        <div className="row">
          {notes.length === 0 ? (
            <div
              className="col-md-6 text-center justify-content-center align-items-center d-flex"
              style={{ height: "150px" }}
            >
              <Button
                className="addicon rounded-circle"
                variant="contained"
                onClick={() => setopenModal(true)}
              >
                <BiAddToQueue size={24} />
              </Button>
            </div>
          ) : (
            notes.map((item, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <Card>
                  <CardHeader className="text-right d-flex">
                    <CardTitle tag="h5" style={{ margin: "auto 0" }}>
                      {item.title}
                    </CardTitle>
                    <TiDelete
                      className="text-right delete-btn shadow rounded-circle"
                      size={24}
                      onClick={() =>
                        setopenDeleteModal({ show: true, id: item.id })
                      }
                    />
                  </CardHeader>
                  <CardBody
                    onClick={() => viewNote(item, index)}
                    style={{ whiteSpace: "pre" }}
                  >
                    <CardText className="notes-desc">{item.desc}</CardText>
                  </CardBody>
                </Card>
              </div>
            ))
          )}
        </div>
        <UpdateModal
          opeUpdatemodal={opeUpdatemodal}
          setopeUpdatemodal={setopeUpdatemodal}
          noteData={noteData}
          upadteNote={editNote}
        />
        <DeleteModal
          DeletModalData={openDeleteModal}
          setopen={setopenDeleteModal}
        />
      </div>
      {notes.length > 0 && (
        <div className="addicon-wrap">
          <Button
            className="addicon rounded-circle"
            variant="contained"
            color="primary"
            onClick={() => setopenModal(true)}
          >
            <BiAddToQueue size={24} />
          </Button>
        </div>
      )}
    </>
  );
}

const DeleteModal = ({ DeletModalData, setopen, Deletenote }) => {
  const { dispatch } = useContext(DataContext);
  return (
    <Modal
      isOpen={DeletModalData.show}
      toggle={() => {
        setopen((oldState) => ({ ...oldState, show: !DeletModalData.show }));
      }}
    >
      <ModalHeader>Are you sure want to Delete this Note..?</ModalHeader>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            setopen((oldState) => ({
              ...oldState,
              show: !DeletModalData.show,
            }));
          }}
        >
          cancel
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            dispatch({
              mode: "remove",
              id: DeletModalData.id,
            });
            setopen((oldState) => ({
              ...oldState,
              show: !DeletModalData.show,
            }));
          }}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};
