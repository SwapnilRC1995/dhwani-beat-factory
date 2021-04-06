import React from 'react';
import $ from 'jquery';

import {connect} from 'react-redux';
import addBolAction from '../actions/addBolAction.js'

const mapDispatchToProps = (dispatch) => {
    return {
        addBolAction: (bolEntered, index) => dispatch(addBolAction(bolEntered, index))
    };
}

class GenerateForm extends React.Component {
    handleChange = (event) => {
        if(event.target.value != null && event.target.value !== ""){
            var matches = event.target.id.match(/(\d+)/);
            if(matches){
                var id = parseInt(matches[0])+1;
                var modifiedId =   event.target.id.replace(/\d+/g,'').concat(id);
                var selectedId = parseInt(matches[0])-1;
                $("#"+modifiedId).removeAttr("readonly").css('cursor', 'text');
                $("#"+modifiedId).attr("required","true");
                this.props.addBolAction(event.target.value, selectedId);
            }           
        }
    }
    render(){
        var stepIndex = parseInt(this.props.stepIndex);
        return (
                <>
                    {this.props.selectedTaalForm.step.map((step,index) => {
                        var items = [];
                        var setBorder = "";
                        if(index === 0 && (this.props.border !== null || this.props.border !== "")){
                            setBorder = this.props.border;
                        }
                        for (let i = 0; i < step; i++) {
                            if(i !== step-1){
                                var paddingClass="row";
                            } 
                            if(stepIndex === 1 || stepIndex === ((parseInt(this.props.selectedTaalForm.matra) * this.props.counter)+1)){
                                items.push(
                                    <div className="d-md-inline-block px-4">
                                        <td className={paddingClass}>
                                            <input type="text" id={`step-${stepIndex}`} name={stepIndex++} className="input-field bol-input" onBlur={this.handleChange} required></input>
                                        </td>
                                        <br className="d-md-none d-block"/>
                                    </div>
                                );
                            }else{
                                items.push(
                                    <div className="d-md-inline-block px-4">
                                        <td className={paddingClass}>
                                            <input type="text" id={`step-${stepIndex}`} name={stepIndex++} className="input-field bol-input" onBlur={this.handleChange} readOnly></input>
                                        </td>
                                        <br className="d-md-none d-block"/>
                                    </div>
                                );
                            }
                            
                        }
                        return(
                            <tr className={`d-md-flex mb-4 pb-2 ${setBorder}`} key={index}>
                                <div className="d-md-inline-block table-heading-container">
                                    <th className="table-heading">{`Line-${index+1}`}</th>
                                    <br className="d-md-none d-block"/>
                                </div>
                                {items}
                                <br/>
                            </tr>
                        )
                    })}
                </>
                    
        )
    }
}

export default connect(null, mapDispatchToProps) (GenerateForm);