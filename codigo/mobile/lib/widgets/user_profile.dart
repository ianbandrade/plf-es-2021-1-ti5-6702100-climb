import 'package:flutter/material.dart';

class UserProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(
          Icons.account_circle_rounded,
          size: 140,
        ),
        Text(
          'JoaoGuiMB',
          style: Theme.of(context).textTheme.headline4,
        )
      ],
    );
  }
}
