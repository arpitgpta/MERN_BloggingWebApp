import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Example = (props) => {
  return (
    <div class="wrapper fadeInDown" >
    <div id="formContent">
      <form>
       {/* <FormGroup> */}
        <input type="text" id="Full name" class="fadeIn second" name="login" placeholder="Topic"/>
        <input type="text" id="username" class="fadeIn second" name="login" placeholder="Text"/>
        <input type="text" id="Email" class="fadeIn second" name="login" placeholder="Tag"/>
        <Button submit="submit">Add Tag</Button>
        {/* </FormGroup> */}
      </form>
    </div>
  </div>
      );
  }

export default Example; 
   