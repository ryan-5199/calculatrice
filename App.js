import React, { useState } from 'react';
import { Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function HomeScreen({ navigation }) {
  const [name, setname] = useState("RENTREZ VOTRE FORMULE")
  const [result, setresult] = useState("Aucun résultat")
  var nouveauname = ''
  const [formule, setformule] = useState([''])
  const number = [['9','8','7'],['6','5','4'],['3','2','1'],['+','0','=']]

  function implement(result : string){
    formule.push(result)
  }

  function addToName(x:string){
    if (name=='RENTREZ VOTRE FORMULE'){
      setname(x)
    } else {
      nouveauname=(name + x)
      setname(nouveauname)
    }
  }
 

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
    }}>
          <Text style={{fontWeight:'bold', margin:'20px', border:'3px solid #2196F3', padding:'5px', color:'#2196F3'}}>{name}</Text>

          {number.map(ligne=> (
            <View style={{
              display:'flex',
              flexDirection:'row'
            }}>
              { ligne.map(element => (
                <TouchableOpacity style={{
                  margin: '5px',
                  width:'150px',
                  height:'100px',
                  backgroundColor:'#2196F3',
                  justifyContent:'center',
                  alignItems:'center',
                }} 
                onPress={() => {addToName(element)}}><Text style={{ color:'white', fontSize:'20px' }}>{element}</Text></TouchableOpacity>
              ))}
            </View> 
          ))}

          <Button title="CLEAR" onPress={() => {setname('RENTREZ VOTRE FORMULE')
              implement(name)           
            }}></Button>  
          

          <Button  style={{marginTop:'20px'}} title='Go to History' onPress={() => navigation.navigate('History', { formule : formule} )}/>     
    </View>
  );
}

function HistoryScreen({ route, navigation }) {
  const history = route.params.formule
  console.log(history)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontWeight:'bold', margin:'20px', fontSize:'20px'}}>History Screen</Text>
      <Text style={{fontWeight:'bold', marginBottom:'20px', fontSize:'20px'}}>Derniers résultats :</Text>
          { history.map(element => (
            <Text style={{marginBottom:'20px', fontSize:'15px'}}>{element}</Text>
          ))}
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
