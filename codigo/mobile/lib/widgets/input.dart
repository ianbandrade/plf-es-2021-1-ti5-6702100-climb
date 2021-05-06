import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Input extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool isPassword;
  final IconData icon;

  Input(
      {this.label,
      this.controller,
      this.keyboardType = TextInputType.text,
      this.isPassword = false,
      this.icon});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: TextField(
        style: TextStyle(color: Theme.of(context).primaryColor),
        obscureText: isPassword,
        controller: controller,
        keyboardType: keyboardType,
        cursorColor: Theme.of(context).accentColor,
        decoration: InputDecoration(
          filled: true,
          hintText: label,
          hintStyle: TextStyle(
            color: Theme.of(context).primaryColor,
          ),
          fillColor: Theme.of(context).accentColor,
          prefixIcon: Icon(
            icon,
            color: Theme.of(context).primaryColor,
          ),
          border: OutlineInputBorder(),
        ),
      ),
    );
  }
}
