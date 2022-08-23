import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, TouchableNativeFeedbackBase,Alert } from 'react-native';
import { InputWithLabel, PickerWithLabel, AppButton } from '../components/UI';
import CheckBox from '@react-native-community/checkbox';
import BackButton from '../components/BackButton';

let common = require('../BookStatus');
let SQLite = require('react-native-sqlite-storage');

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === '' && (valid = false);
    });

    return valid;
};

export default class UpdateScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.route.params.book,
            Img: this.props.route.params.book.Img,
            Title: this.props.route.params.book.Title,
            Author: this.props.route.params.book.Author,
            Description: this.props.route.params.book.Description,
            Price: this.props.route.params.book.Price,
            Status: this.props.route.params.book.Status,
            isAvailable: true,
            formErrors: {
                Img: '',
                Title: '',
                Author: '',
                Description: '',
                Price: '',
            }
        };
        this._update = this._update.bind(this);
        this.db = SQLite.openDatabase(
            { name: 'bookdb', createFromLocation: '~db.sqlite' },
            this.openDb,
            this.errorDb,
        );
    }

    handleSubmit = summit => {
        summit.preventDefault();

        if (formValid(this.state)) {
            console.log("successful submiting")
            this._update();
        } else {
            Alert.alert("FORM INVALID\nPlease Fill up the form.");
        }
    };

    handleChange = (value, field) => {
    
        let formErrors = { ...this.state.formErrors };

        console.log(value);
        switch (field) {
            case 'Img':
                formErrors.Img =
                    value === '' ? "Field cannot be empty" : "";
                break;
            case 'Title':
                formErrors.Title =
                    value === '' ? "Field cannot be empty" : "";
                break;
            case 'Author':
                formErrors.Author =
                    value === '' ? "Field cannot be empty" : "";
                    console.log(formErrors.Author);
                break;
            case 'Description':
                formErrors.Description =
                    value === '' ? "Field cannot be empty" : "";
                break;
            case 'Price':
                formErrors.Price =
                    value === '' ? "Field cannot be empty" : "";
                    //value.isNumber()?"Price must be a number" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [field]: value });
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: true,
            headerTitle: 'Add New Book',
            headerStyle: {
                backgroundColor: '#1C3879',
            },
            headerTitleStyle: {
                color: '#fff',
            },
            headerLeft: () => (
                <BackButton parentProps={this.props} color="white" />
            ),
        });
    }


    _update() {
        this.db.transaction(tx => {
            tx.executeSql('UPDATE book SET Img=?,Title=?,Author=?,Description=?,Price=?,Status=? WHERE id = ?', [
                this.state.Img,
                this.state.Title,
                this.state.Author,
                this.state.Description,
                this.state.Price,
                this.state.Status,
                this.props.route.params.book.ID,
            ]);
        });
        this.props.route.params.refresh();
        this.props.route.params.homeRefresh();
        this.props.navigation.goBack();
    }
    openDb() {
        console.log('Database opened');
    }
    errorDb(err) {
        console.log('SQL Error: ' + err);
    }

    render() {
        const { formErrors } = this.state;


        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <InputWithLabel
                            className={formErrors.Img.length > 0 ? "error" : null}
                            container={styles.SectionContainer}
                            textLabelStyle={styles.TextLabel}
                            textInputStyle={styles.TextInput}
                            label={'Img URL'}
                            placeholder={'Type Book Img Url Here'}
                            value={this.state.Img}
                            onChangeText={Img => {
                                this.handleChange(Img, 'Img');
                                this.setState({ Img });
                            }}
                            orientation={'vertical'}
                        />
                        {formErrors.Img.length > 0 && (<Text Style={styles.errorMessage}>{formErrors.Img}</Text>)}
                    </View>
                    <View>
                        <InputWithLabel
                            className={formErrors.Title.length > 0 ? "error" : null}
                            container={styles.SectionContainer}
                            textLabelStyle={styles.TextLabel}
                            textInputStyle={styles.TextInput}
                            placeholder={'Type Book Title Here'}
                            label={'Title'}
                            value={this.state.Title}
                            onChangeText={Title => {
                                this.handleChange(Title, 'Title');
                                this.setState({ Title });
                            }}
                            orientation={'vertical'}
                        />
                        {formErrors.Title.length > 0 && (<Text Style={styles.errorMessage}>{formErrors.Title}</Text>)}
                    </View>
                    <View>
                        <InputWithLabel
                            className={formErrors.Author.length > 0 ? "error" : null}
                            container={styles.SectionContainer}
                            textLabelStyle={styles.TextLabel}
                            textInputStyle={styles.TextInput}
                            placeholder={'Type Book Author Here'}
                            label={'Author'}
                            value={this.state.Author}
                            onChangeText={Author => {
                                this.handleChange(Author, 'Author');
                                this.setState({ Author });
                            }}
                            orientation={'vertical'}
                        />
                        {formErrors.Author.length > 0 && (<Text Style={styles.errorMessage}>{formErrors.Author}</Text>)}
                    </View>
                    <View>
                        <InputWithLabel
                            className={formErrors.Description.length > 0 ? "error" : null}
                            container={styles.DescriptionContainer}
                            textLabelStyle={styles.TextLabel}
                            textInputStyle={[styles.DescriptionTextInput, { height: 150, textAlignVertical: 'top' }]}
                            placeholder={'Type Book Description Here'}
                            multiline={true}
                            label={'Description'}
                            value={this.state.Description}
                            onChangeText={Description => {
                                this.handleChange(Description, 'Description');
                                this.setState({ Description });
                            }}
                            orientation={'vertical'}
                        />
                        {formErrors.Description.length > 0 && (<Text Style={styles.errorMessage}>{formErrors.Description}</Text>)}
                    </View>
                    <View>
                        <InputWithLabel
                            className={formErrors.Price.length > 0 ? "error" : null}
                            container={styles.SectionContainer}
                            textLabelStyle={styles.TextLabel}
                            textInputStyle={styles.TextInput}
                            placeholder={'Type Book Price Here'}
                            label={'Price'}
                            value={this.state.Price.toString()}
                            onChangeText={Price => {
                                this.handleChange(Price, 'Price');
                                this.setState({ Price });
                            }}
                            keyboardType={'numeric'}
                            orientation={'vertical'}
                        />
                        {formErrors.Price.length > 0 && (<Text Style={styles.errorMessage}>{formErrors.Price}</Text>)}
                    </View>

                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            value={this.state.Status == 'Available' ? true : false}
                            tintColors={{ true: '#1C3879', false: '#C21010' }}
                            onValueChange={isAvailable => {
                                this.setState({ isAvailable });

                                this.setState({
                                    Status: this.state.isAvailable == false ? 'Not Available' : 'Available',
                                })
                            }}
                        />

                        <Text style={{ color: '#1C3879' }}>Set this book to available</Text>
                    </View>
                    <View style={{ height: 50 }}></View>
                    <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <View style={{ heigth: 100 }}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        heigth: '70%',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    SectionContainer: {
        height: 80,
        margin: 5,
    },
    DescriptionContainer: {
        height: 180,
        margin: 5,
    },
    TextLabel: {
        flex: 1,
        marginLeft: 3,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: '#000'
    },
    error: {
        borderWidth: 2,
        borderColor: '#ff0000',
      },
      errorMessage: {
        color: '#ff0000',
        fontSize: 0.75,
      },
    TextInput: {
        fontSize: 14,
        paddingLeft: 10,
        color: '#000',
        borderColor: '#607EAA',
        borderWidth: 1.5,
        borderRadius: 15,
    },
    DescriptionTextInput: {
        fontSize: 14,
        paddingLeft: 15,
        color: '#000',
        borderColor: '#607EAA',
        borderWidth: 1.5,
        borderRadius: 20,
    },
    pickerItemStyle: {
        fontSize: 20,
        color: '#000099',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#1C3879',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});