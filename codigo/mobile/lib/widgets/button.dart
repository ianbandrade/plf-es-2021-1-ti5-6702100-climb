import 'package:flutter/material.dart';

class AdaptativeButton extends StatelessWidget {
  final String label;
  final Function onPressed;
  final ButtonStyle style;
  final TextStyle textStyle;
  AdaptativeButton({this.label, this.onPressed, this.style, this.textStyle});

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
