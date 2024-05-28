import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/Login/LoginPage';
import TasksPage from './TasksPage';
import RegisterPage from './pages/Login/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="TasksPage" component={TasksPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        {/*
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ route }) => ({ title: route.params.displayName })}
        />
       */}
       <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
