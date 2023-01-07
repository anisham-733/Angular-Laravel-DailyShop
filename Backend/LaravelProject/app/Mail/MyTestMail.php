<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MyTestMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details,$prodDetails)
    {
        
        $this->details = $details;
        $this->prodDetails = $prodDetails;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */   
        public function build()
        {
            return $this->subject('Mail from Daily Shop.com')
                        ->view('emails.myTestMail')->with(['details'=>$this->details,'prodDetails'=>$this->prodDetails]);
        }       
}
