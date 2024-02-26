import 'package:flutter/material.dart';

import 'contact/Contact.dart';
import 'contact/contact_row.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final contactRows =
    defaultContacts.map((contact) => ContactRow(contact: contact)).toList();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Contact list"),
      ),
      body: ListView(children: contactRows),
    );
  }

}