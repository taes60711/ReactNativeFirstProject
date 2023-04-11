import * as React from 'react';
import { Animated, Button, Image, Text, View } from 'react-native';
import { DrawerActions, NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Kupo } from './tsx/Kupo';
import { Home } from './tsx/Home';
import { Menu } from './tsx/Menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Iconss,Icons } from './src/icons';
import { Account } from './tsx/Account';
import { OrderPage } from './tsx/Order';
import { PointPage } from './tsx/Point';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" options={{headerShown:false}} component={Homemain} />
        <Stack.Screen name="Kk" component={Account} />  
        <Stack.Screen name="Kupo" component={Kupo} />  
      </Stack.Navigator>  */}
      <Drawer.Navigator  initialRouteName="Stacktest">
        {/* <Drawer.Screen name="Home" component={Homemain} /> */}
        <Drawer.Screen name="ホーム" options={{headerShown:false}} component={Stacktest} />
        <Drawer.Screen name="アカウント" component={Account} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function Stacktest(){
  return(
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" options={{headerShown:false}} component={Homemain} />
        <Stack.Screen name="Kk" component={Account} />  
        <Stack.Screen name="Kupo" component={Kupo} />  
      </Stack.Navigator> 
  );
}

const AccountButton =()=>{
  console.log('Account')
}


function Homemain({navigation}: {navigation: any}){

  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarStyle:{
        position:'absolute',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'10%',
      },
      
        headerLeft:()=>( 
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <View style={{width:80,height:40,alignItems:'center',justifyContent:'center'}}>
          <Icons type={Iconss.Ionicons} name='list' size={25} color={'#b3b3b5'}
          style={{height:25,width:25}} ></Icons>
          {/* <Text style={{paddingTop:3,fontSize:12, color:'#b3b3b5'}}>アカンウト</Text>  */}
          </View>
        </TouchableOpacity>),
        headerTitle:()=>
        (<Image source={require('./img/Logo.png')}
            style={{width:50,height:50,marginBottom:10}}/>),
        tabBarActiveTintColor: "#c1a38b",
        tabBarInactiveTintColor: "#b3b3b5",
    }}>
    

    {TabArr.map((item,index)=>{
      return(
       <Tab.Screen name={item.route}  options={{
       
        // tabBarButton: (props) => {
        //   return(
        //      <TouchableOpacity onPress={()=>navigation.navigate(item.route)}>
        //        <Normal type={item.icnoType} name={item.icomName} color={"#c1a38b"} size={25} item={item.component}/>
        //     </TouchableOpacity>
        //   );
        // },
        
        tabBarLabel: ({focused, color,}) => (
          <Text  style={{color: focused ? color : color ,fontSize:12 ,fontWeight:'700'}}>{item.font}</Text>
        ),
        tabBarIcon:({color})=> 
        item.route=='test'?<Order type={item.icnoType} name={item.icomName} color={color} size={25}/>
        :<Normal type={item.icnoType} name={item.icomName} color={color} size={25}/>
       }} component={item.component}/>
       
      )
    })}
      </Tab.Navigator> 
  );
}

const TabArr =[
  {route:'Home',icnoType:Iconss.FontAwesome,icomName:'home',component:Home ,font:'首頁'},
  {route:'Menu',icnoType:Iconss.FontAwesome,icomName:'coffee',component:Menu,font:'Menu'},
  {route:'test',icnoType:Iconss.Ionicons,icomName:'md-restaurant',component:OrderPage,font:''},
  {route:'PointPage',icnoType:Iconss.FontAwesome,icomName:'money',component:PointPage,font:'Point'},
  {route:'Account',icnoType:Iconss.FontAwesome,icomName:'user',component:Account,font:'帳戶'},
];



export const Normal = ({ type, name, color ,size = 24,item}:any) => {
  const fontSize = 24;
  const fadeAnim = new Animated.Value(0);

  const interPolateSize = fadeAnim.interpolate({
     // 入力される値(フレーム)
     inputRange: [0, 75, 150, 225, 300],
     // 出力される値
     outputRange: [0, -10, 0, -10, 0],
  });
  
  const _onPress = () => {    
    console.log(item)
    Animated.timing(fadeAnim, {
      toValue: 300,
      duration: 400,
      useNativeDriver : true,
    }).start();
  }

  return (
    <TouchableOpacity  activeOpacity={1} onPressIn={()=>{_onPress()}} >
      <Animated.View  style={{
        transform : [{translateY : interPolateSize}],
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Icons type={type} name={name} color={color} size={size || fontSize} />
      </Animated.View>
    </TouchableOpacity>
  )

  
}

export const Order = ({ type, name, color ,size = 24,}:any) => {
  const fontSize = 24;

 

  return (
   
    <View style ={{
      width:78,
      height:78,
      backgroundColor:'white',
      borderRadius:45,
      shadowColor: "grey",
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 1,
      alignItems:'center',
      justifyContent:'center'}}
    >
      <View style={{width:80,height:80 ,borderRadius:60,borderStartWidth:1.5,borderEndWidth:1.5,borderColor:'#e0cdbe',alignItems:'center',justifyContent:'center'}}>
        <Icons type={type} name={name} color={'#c1a38b'} size={size || fontSize} />
        <Text style={{color:'#c1a38b', fontSize:12 ,fontWeight:'700'}}>餐點訂購</Text>              
      </View>
    </View>

   
  )
}




