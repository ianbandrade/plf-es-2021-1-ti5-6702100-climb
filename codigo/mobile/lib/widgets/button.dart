import 'package:flutter/material.dart';

class AdaptativeButton extends StatelessWidget {
  final String label;
  final Function onPressed;

  AdaptativeButton({this.label, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        textStyle: TextStyle(fontSize: 18, fontFamily: 'Alatsi'),
      ),
      child: Text(label),
      onPressed: onPressed,
    );
  }
}
