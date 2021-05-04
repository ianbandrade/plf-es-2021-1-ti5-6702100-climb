import 'package:flutter/material.dart';

import 'button.dart';

class AppTile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        height: 110,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(18),
          child: ListTile(
            title: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Hello World',
                      style: Theme.of(context).textTheme.headline6,
                    ),
                    Button(
                      label: 'Acessar',
                      style: ElevatedButton.styleFrom(
                        primary: Colors.green[400],
                      ),
                      textStyle: Theme.of(context).textTheme.headline6,
                      onPressed: () {},
                    )
                  ],
                ),
                Row(
                  children: [
                    Icon(Icons.add),
                    Text(
                      'JoaoGuiMB/Blookg',
                      style: Theme.of(context).textTheme.headline6,
                    ),
                  ],
                )
              ],
            ),
            tileColor: Theme.of(context).backgroundColor,
          ),
        ),
      ),
    );
  }
}
