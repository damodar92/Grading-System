import React ,{Component} from 'react';
import loader from '../loader.gif';

export default class Loader extends Component {
    render = () => {
        return(
             <div id = 'loaderDiv'>
                 <img src = {loader} id = 'loader'></img>
             </div>
        )
    }
}