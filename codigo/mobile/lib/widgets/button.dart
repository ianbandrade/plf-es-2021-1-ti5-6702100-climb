import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String label;
  final Function onPressed;
  final ButtonStyle style;
  final TextStyle textStyle;

  Button({this.label, this.onPressed, this.style, this.textStyle});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: style,
      child: Text(
        label,
        style: textStyle,
      ),
      onPressed: onPressed,
    );
  }
}
