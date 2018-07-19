//Dependencies
const path =require('path');
const webpack =require ('webpack');

//Paths
const PATHS ={
  entry:   path.join(__dirname,'src/app/index.js'),
  output: 'public'
}

const getEntry = ()=>{
  const entry=[
    PATHS.entry
  ];
  return entry;
}
const getDevTool =()=>{
  let devString = 'source-map';
  return devString;
}
const getContext = () =>{
  let contextPath= path.join(__dirname,'src')
  return contextPath;
}
const getOutput = () =>(
  {
    path: path.join(__dirname,PATHS.output),
    filename: 'bundle.js',
    publicPath: path.join(__dirname,'public')
  }
)
const getModule = () => (
  {
    rules:[
      {
        test: /(\.js||.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
)
module.exports ={
  devtool:  getDevTool(),
  context:  getContext(),
  entry:  getEntry(),
  output: getOutput(),
  module: getModule()
}
