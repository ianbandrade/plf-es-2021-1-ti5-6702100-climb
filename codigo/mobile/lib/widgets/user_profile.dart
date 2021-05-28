import 'package:flutter/material.dart';

class UserProfile extends StatelessWidget {
  final String image;
  final String name;

  UserProfile({this.name, this.image = null});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        textDirection: TextDirection.ltr,
        children: [
          image == null
              ? Icon(
                  Icons.account_circle_rounded,
                  size: 140,
                )
              : ClipRRect(
                  child: Image.network(
                    image,
                    height: 160,
                    width: 160,
                  ),
                  borderRadius: BorderRadius.circular(80.0),
                ),
          SizedBox(
            height: 10,
          ),
          Text(
            name,
            style: Theme.of(context).textTheme.headline4,
            textAlign: TextAlign.center,
          )
        ],
      ),
    );
  }
}
