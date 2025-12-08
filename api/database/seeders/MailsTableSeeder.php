<?php

namespace Database\Seeders;

use Flynsarmy\CsvSeeder\CsvSeeder;

class MailsTableSeeder extends CsvSeeder
{
    public function __construct() 
    {
        $this->table = 'mails'; 
        $this->filename = base_path().'/database/seeders/csv/mails.csv';
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        parent::run();
    }
}
