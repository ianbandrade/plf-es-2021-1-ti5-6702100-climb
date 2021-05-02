import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:io';

class AdaptativeTextfield extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool isPassword;

  AdaptativeTextfield({
    this.label,
    this.controller,
    this.keyboardType = TextInputType.text,
    this.isPassword = false,
  });

  @override
  Widget build(BuildContext context) {
    final isIOS = Platform.isIOS ? true : false;

    return isIOS
        ? Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: CupertinoTextField(
              obscureText: isPassword,
              controller: controller,
              keyboardType: keyboardType,
              placeholder: label,
              padding: EdgeInsets.symmetric(horizontal: 6, vertical: 12),
            ),
          )
        : TextField(
            obscureText: isPassword,
            controller: controller,
            keyboardType: keyboardType,
            decoration: InputDecoration(labelText: label),
          );
  }
}
