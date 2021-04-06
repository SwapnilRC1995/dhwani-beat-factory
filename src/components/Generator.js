import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import {saveAs} from 'file-saver';
import { connect } from 'react-redux';
import GenerateForm from './GenerateForm';

class Generator extends React.Component {

    constructor(){
        super();
        this.state = {
            taals: [{
                name: "Teentaal",
                matra: "16",
                step: [4,4,4,4]
            },
            {
                name: "Dhamar",
                matra: "14",
                step: [3,4,3,4]
            },
            {
                name: "Ada Chautaal",
                matra: "14",
                step: [2,2,2,2,2,2,2]
            },
            {
                name: "Ektaal",
                matra: "12",
                step: [3,3,3,3]
            },
            {
                name: "Chaar taal ki sawari",
                matra: "11",
                step: [2,2,2,2,3]
            },
            {
                name: "Jhaptaal",
                matra: "10",
                step: [2,3,2,3]
            },
            {
                name: "Matta taal",
                matra: "9",
                step: [4,2,3]
            },
            {
                name: "Kaharwa",
                matra: "8",
                step: [4,4]
            },
            {
                name: "Rupak",
                matra: "7",
                step: [3,2,2]
            },
            {
                name: "Dadra",
                matra: "6",
                step: [3,3]
            }],
            isTaalSelected: false,
            selectedTaalForm: {
                name: "",
                matra: "",
                step: []
            },
            bolEntered: [],
            generatorFormList: []
        }
        this.handleAddGeneratorForm = this.handleAddGeneratorForm.bind(this);
        this.handleRemoveGeneratorForm = this.handleRemoveGeneratorForm.bind(this);
    }
    handleChange = (event) => {
        if(this.state.isTaalSelected && event.target.value != null && event.target.value !== ""){
        }else{
            this.state.taals.find(data => {
                if(event.target.value != null && data.name === event.target.value){
                    $('#matra').val(data.matra);
                    $('#step').val(data.step.length);
                    this.setState({
                        selectedTaalForm: data,
                    });
                }
                return 0;
            });           
            $(".error-container").html('');
            $("#name").removeClass("field-error-border"); 
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.isTaalSelected){
            this.props.bolToProps.map((bol, index) => {
                this.state.bolEntered[index] = bol;
                return 0;
            })
            this.setState({
                bolEntered: this.state.bolEntered
            })
            if(this.state.bolEntered !== null ){
               axios.post('https://www.dhwanibeatfactoryclient.tk/create-pdf', this.state)
                .then(() => axios.get('https://www.dhwanibeatfactoryclient.tk/fetch-pdf', {responseType: 'blob'}))
                .then((res) => {
                    const pdfBlob = new Blob([res.data], {type: 'application/pdf'});
                    saveAs(pdfBlob, `${this.state.selectedTaalForm.name}.pdf`);
                })
                .then(() => {
                    window.location.reload();
                })
                .then(() => axios.get('https://www.dhwanibeatfactoryclient.tk/delete-pdf'))
            }else{
                console.log("No values entered")
            }          
        }else{
            if($('#name').val() === null || $('#name').val() === ""){
                $(".error-container").html('<i class="fa fa-times mr-2 field-error-message"></i><p class="field-error-message mb-0">Please enter the taal</p>');
                $("#name").addClass("field-error-border"); 
            }else{
                this.setState({
                    isTaalSelected: true,
                });
            }
        }
    }
    handleAddGeneratorForm(){
        var counter = this.state.generatorFormList.length+1;
        var stepIndex = (parseInt(this.state.selectedTaalForm.matra) * counter)+1;
        this.setState({
            generatorFormList: this.state.generatorFormList.concat(<GenerateForm counter={counter} stepIndex={stepIndex} selectedTaalForm={this.state.selectedTaalForm } handleBolEnteredFromSnippet={this.handleBolEnteredFromSnippet} border="form-border"/>)
        });
    }
    handleRemoveGeneratorForm(){
        console.log(this.state.generatorFormList.length);
        this.setState({
            generatorFormList: this.state.generatorFormList.splice(1, 1)
        });
    }
    render(){
    if(this.state.isTaalSelected){
        return (
            <div className="my-3 py-3">
                <div className="container mt-3">
                    <div className="d-flex justify-content-center">
                    <form onSubmit={this.handleSubmit} className="matra-box">
                        <table className="d-flex flex-column">
                            <GenerateForm stepIndex="1" selectedTaalForm={this.state.selectedTaalForm } handleBolEnteredFromSnippet={this.handleBolEnteredFromSnippet}/>
                            {this.state.generatorFormList}
                            <tr className="d-md-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-center justify-content-md-start align-items-center w-100 text-md-left text-center mb-md-0 mb-4">
                                <i class="fa fa-2x fa-minus-circle mr-2 plus-minus-buttons" onClick={this.handleRemoveGeneratorForm}></i>
                                <p className="px-3 py-2 mb-0 counter">{this.state.generatorFormList.length+1}</p>
                                <i class="fa fa-2x fa-plus-circle ml-2 plus-minus-buttons" onClick={this.handleAddGeneratorForm}></i>
                                </div>
                                <button type="submit" className="btn btn-grey col-md-6 col-12 d-flex align-items-center justify-content-center mb-md-0 mb-3" id="show-contact-us-form-third-step">Generate &amp; Download</button>
                            </tr>
                        </table>                        
                    </form>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
        <div className="my-3 py-3">
            <div className="container mt-3">
                <div className="generator-box generator-box-margin">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row align-items-center">
                            <div className="col-md-2 col-12">
                                <label htmlFor="name" className="input-label">Taal</label>
                            </div>
                            <div className="col-md-10 col-12">
                                <i className="fa fa-angle-down position-drop-icon"/>
                                <select name="name" id="name" className="input-field mb-1" onChange={this.handleChange}>
                                    <option defaultValue="" selected disabled>Not specified</option>
                                    {this.state.taals.map((taal, index) => {
                                        return(
                                        <option value={taal.name} key={index}>{taal.name}({taal.matra})</option>
                                        )
                                    })}
                                </select>
                                <small className="error-container d-flex align-items-center"></small>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row align-items-center">
                            <div className="col-md-2 col-12">
                                <label htmlFor="matra" className="input-label">Matra</label>
                            </div>
                            <div className="col-md-10 col-12">
                                <input type="text" id="matra" name="matra" defaultValue="0" className="input-field" onChange={this.handleChange} readOnly></input>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row align-items-center">
                            <div className="col-md-2 col-12">
                                <label htmlFor="step" className="input-label">Step</label>
                            </div>
                            <div className="col-md-10 col-12">
                                <input type="text" id="step" name="step" defaultValue="0" className="input-field" onChange={this.handleChange} readOnly></input>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row align-items-center">
                            <div className="col-12 mb-md-0 mb-3">
                                <button type="submit" className="btn btn-grey col-lg-5 col-md-6 col-12 d-flex align-items-center justify-content-center float-right" id="show-contact-us-form-third-step">Next&nbsp;&nbsp;<i className="fa fa-angle-right"/></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
  }  
}
const mapStateToProps = (state) => {
    return {
        bolToProps: state
    }
}

export default connect(mapStateToProps) (Generator);