import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { BiAddToQueue } from "react-icons/bi"
import { Button } from "@material-ui/core"
import { TiDelete } from "react-icons/ti";
import { AiOutlineFileSearch } from 'react-icons/ai'
import AddModal from "./addModal"
import UpdateModal from "./updateModal";
import { InputAdornment, Grid, TextField } from "@material-ui/core";


export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteData, setnoteData] = useState({ title: "", desc: "", noteId: "" });
  const [openModal, setopenModal] = useState(false);
  const [opeUpdatemodal, setopeUpdatemodal] = useState(false);



  function getNotes() {
    var storednotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storednotes);
  }

  const addNote = (values, event) => {
    console.log(values)
    if (!values.title && !values.name) {
      setopenModal(false)
      return
    }
    setopenModal(false)
    var newnotes = [...notes, values];
    setNotes(newnotes);
    localStorage.setItem("notes", JSON.stringify(newnotes));
    event.resetForm()
  }

  const Deletenote = (noteid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this notes"
    );
    if (confirm) {
      var removenote = notes.filter((item, index) => index !== noteid);
      setNotes(removenote);
      localStorage.setItem("notes", JSON.stringify(removenote));
    }
  };

  const editNote = (values, event) => {
    setopeUpdatemodal(false)
    var arr = [];
    const searchIndex = values.noteId
    notes[searchIndex] = values
    notes.map((item, index) => { arr.push(item) })
    setNotes(arr)
    localStorage.setItem("notes", JSON.stringify(arr));
    event.resetForm()

  };

  const searchitem = (e) => {
    const searchValue = e.target.value;
    var storednotes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredCountries = storednotes.filter((note) => {
      return (
        note.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    setNotes(filteredCountries);
  };

  const viewNote = (note, id) => {
    setnoteData({ ...note, noteId: id })
    setopeUpdatemodal(true)
  }

  useEffect(() => {
    getNotes();
  }, []);



  return (
    <>

      <h1 className="text-dark text-center p-3 mt-3">Notes</h1>
      <div className="container">
        <div className="form-group">
          <TextField id="seach-field" label={<AiOutlineFileSearch size={24} />} className="w-100" variant="outlined" placeholder="Enter Note Title" onChange={(e) => searchitem(e)}
          />
        </div>
        <AddModal openModal={openModal} setopenModal={setopenModal} addNote={addNote} />
        <div className="row">
          {notes.map((item, index) => (
            <>
              <div className="col-md-6 mb-2">
                <Card >
                  <CardHeader className="text-right d-flex" >
                    <CardTitle tag="h5" style={{ margin: "auto 0" }}>{item.title}</CardTitle>
                    <TiDelete className="text-right delete-btn shadow rounded-circle" size={24} onClick={() => Deletenote(index)} />
                  </CardHeader>
                  <CardBody onClick={() => viewNote(item, index)} style={{ whiteSpace: "pre" }}>
                    <CardText className="notes-desc">
                      {item.desc}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </>
          ))}
          {notes.length === 0 && <div className="col-md-6 text-center justify-content-center align-items-center d-flex" style={{ height: "150px" }}>
            <Button className="addicon rounded-circle" variant="contained" onClick={() => setopenModal(true)}>
              <BiAddToQueue size={24} />
            </Button>
          </div>}
        </div>
        <UpdateModal opeUpdatemodal={opeUpdatemodal} setopeUpdatemodal={setopeUpdatemodal} noteData={noteData} upadteNote={editNote} />
      </div>
      {notes.length > 0 && <div className="addicon-wrap">
        <Button className="addicon rounded-circle" variant="contained" color="primary" onClick={() => setopenModal(true)}>
          <BiAddToQueue size={24} />
        </Button>
      </div>}
    </>
  );
}



