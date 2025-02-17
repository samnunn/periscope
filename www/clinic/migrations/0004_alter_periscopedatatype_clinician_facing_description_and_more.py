# Generated by Django 5.1.6 on 2025-02-17 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0003_rename_outout_prefix_periscopedatatype_output_prefix'),
    ]

    operations = [
        migrations.AlterField(
            model_name='periscopedatatype',
            name='clinician_facing_description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='clinician_facing_label',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='output_prefix',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='output_suffix',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='patient_facing_description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='patient_facing_label',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='periscopedatatype',
            name='search_name',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
