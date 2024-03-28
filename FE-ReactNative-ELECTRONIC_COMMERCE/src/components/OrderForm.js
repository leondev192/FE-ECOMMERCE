import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';

const OrderForm = ({ isVisible, onClose, onSubmit }) => {
    const [address, setAddressLocal] = useState('');
    const [phonenumber, setPhoneNumberLocal] = useState('');

    const setAddress = (text) => {
        setAddressLocal(text);
    };

    const setPhoneNumber = (text) => {
        setPhoneNumberLocal(text);
    };

    const handleSubmit = () => {
        // Kiểm tra xem địa chỉ và số điện thoại có được nhập không
        if (!address || !phonenumber) {
            alert('Vui lòng nhập địa chỉ và số điện thoại.');
            return;
        }
        // Gọi hàm onSubmit và truyền thông tin đặt hàng
        onSubmit({ address, phonenumber });
    };
    
    

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nhập thông tin đặt hàng</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        value={phonenumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: 'rgba(189, 121, 56, 1)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'rgba(189, 121, 56, 0.7)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OrderForm;
