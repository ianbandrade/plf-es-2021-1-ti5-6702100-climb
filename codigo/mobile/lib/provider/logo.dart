import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:provider/provider.dart';

class Logo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isLightMode =
        Provider.of<ThemeProvider>(context).themeMode == ThemeMode.light
            ? true
            : false;

    final String assetName = isLightMode
        ? 'assets/images/light-flat.svg'
        : 'assets/images/dark-flat.svg';
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SvgPicture.asset(assetName),
        Text(
          'CLIMB',
          style: TextStyle(
            fontSize: 32,
            letterSpacing: 3,
          ),
        )
      ],
    );
  }
}
