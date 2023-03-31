import {StyleSheet} from 'react-native';


export const scrStyles = StyleSheet.create({
    medCard: {
      marginTop: 4,
      marginHorizontal: 2,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#000000',
      minWidth: 0,
      flex: 1,
    },
    header: {
      paddingVertical: 2,
      paddingHorizontal: 4,
      fontWeight: 800,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 4,
    },
    vbody: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: 'pink',
    },
    info: {
      paddingVertical: 2,
      width: '75%',
      fontWeight: 'bold',
    },
    delete: {
      // borderWidth: 1,
      // borderColor: '#000000',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 35,
      borderRadius: 4,
    },
    deleteText: {
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 15,
    },
    button: {
        width: '50%',
        marginTop: 10,
      },
  });
  