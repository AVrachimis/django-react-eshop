# Generated by Django 3.2 on 2021-07-30 14:51

from django.db import migrations
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=django_resized.forms.ResizedImageField(blank=True, crop=['top', 'left'], default='/placeholder.png', force_format=None, keep_meta=True, null=True, quality=99, size=[400, 200], upload_to=''),
        ),
    ]
