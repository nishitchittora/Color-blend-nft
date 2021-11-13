import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Color from '../abis/Color.json';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          account: null,
          contract: null,
          totalSupply: 0,
          colors: []
      }
  }

  async componentWillMount(){
      await this.loadWeb3();
      await this.loadBlockchain();
  }

  async loadBlockchain(){
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({
        account: accounts[0]
      })

      const networkId = await web3.eth.net.getId();
      const networkData = Color.networks[networkId];
      let colors = [];
      if(networkData){
          const abi = Color.abi;
          const address = networkData.address;
          let colorContract = new web3.eth.Contract(abi, address);
          this.setState({colorContract});
          const totalSupply = await colorContract.methods.totalSupply().call();
          this.setState({totalSupply})
          for(var i=0;i<totalSupply; i++){
              let color = await colorContract.methods.colors(i).call();
              colors.push(color);
          }
          this.setState({colors});
      }else{
          window.alert("Smart contract not deployed to the detected network");
      }
  }

   mint= (color) =>{
      console.log(color);
      const {colors} = this.state;
      let _this = this;
      this.state.colorContract.methods.mint(color).send({
        from: this.state.account
      })
      .on('confirmation', function(confirmationNumber, receipt){
          console.log(confirmationNumber, receipt);
          _this.setState({
              colors: [...colors, color]
          })
      })
  }

  async loadWeb3(){
      if(window.ethereum){
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable()
      }else if(window.web3){
          window.web3 = new Web3(window.web3.currentProvider);
      }else{
          window.alert("Non-ethereum browser detected. You should consider trying metamask");
      }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
          <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-block">
                  <small className="text-white">
                    <span id="account">
                    {this.state.account}
                    </span>
                  </small>
              </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                  <h1>Issue Token</h1>
                  <form onSubmit={(event) => {
                      event.preventDefault()
                      const color = this.color.value
                      this.mint(color)
                    }}>
                      <input type="text" className='form-control mb-1'
                    placeholder='e.g. #FFFFFF' ref={(input) => { this.color = input }} />
                    <input
                      type='submit'
                      className='btn btn-block btn-primary'
                      value='MINT'
                    />
                  </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
              {this.state.colors.map((color, key) =>
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div>{color}</div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
