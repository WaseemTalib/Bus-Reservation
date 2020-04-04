import React, { Component, createContext } from 'react';

import { db }  from '../config/firebase'

export const HomeContext = createContext();

export default class HomeContextProvider extends Component {
    state = {
        from:"",
        to:"",
        date:"",
        data: [],
        nextPage:[],
      }
    
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        // console.log(this.state)
      }
    
      componentDidMount = () => {
        db.collection('bus').get().then(snapShot => {
          const data = []
          snapShot.docs.forEach(doc => {
            const gotData = doc.data();
            data.push(gotData)
          })
          this.setState({ data });
        }).catch((err) => {
          console.log(err)
        })

      }
    
      searchBus = (from, to, date) => {
        if (from === to || from === "" || to === "" ||
          from === "0" || to === "0") {
          return alert("Please select a different City")
        }else if(date === ""){
            return alert("Please select a date")
        } else {
         this.setState({ from, to, date })
          window.location.assign("/viewSchedule")
        }
        setTimeout(()=>console.log(this.state.from),1000)
      }
    

    render() {

        return (
            <HomeContext.Provider value={{ ...this.state, searchBus : this.searchBus }}>
                {this.props.children}
            </HomeContext.Provider>
        )
    }

}
