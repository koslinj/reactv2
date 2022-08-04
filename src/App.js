import { Component } from "react";
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      active: false
    }
  }
  changeState(text) {
    this.setState({
      newItem: text
    })
  }
  addItem() {
    const list = [...this.state.list];
    let actual = new Date();
    let hours = actual.getHours();
    let minutes = actual.getMinutes();
    if(minutes<10){
      minutes = '0'+minutes;
    }
    let item = {
      id: 1 + Math.random(),
      name: this.state.newItem.slice(),
      date: `${hours}:${minutes}`
    };
    list.push(item);
    this.setState({
      list,
      newItem: ""
    })
  }
  deleteItem(id) {
    const newList = [...this.state.list].filter(item => item.id !== id);
    this.setState({
      list: newList,
      newItem: ""
    })
  }
  clicked(elem) {

  }
  render() {
    return (
      <div className="container">
        <div className="top">
          <input value={this.state.newItem} onChange={e => this.changeState(e.target.value)} onKeyDown={e => {
            if (e.key === 'Enter') {
              this.addItem();
              this.setState({
                active: true
              })
              setTimeout(() => {
                this.setState({
                  active: false
                })
              }, 300);
            }
          }} placeholder="Wpisz zadanie!"></input>
          <button style={this.state.active === false ? { opacity: '1' } : { opacity: '0.5' }} onClick={() => {
            this.addItem()
            this.setState({
              active: true
            })
            setTimeout(() => {
              this.setState({
                active: false
              })
            }, 300);
          }}>Dodaj</button>
        </div>
        <div className="todos">
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  <div className="timeInfo">
                    {item.date}
                  </div>
                  <div className="text">{item.name}</div>
                  <button id="lol" onClick={(e) => {
                    e.currentTarget.parentElement.style = "opacity: 0;"
                    setTimeout(()=> this.deleteItem(item.id) ,600)
                  }}>Usuń!</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default App;
