<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Schema::defaultStringLength(191);

        // «بكام» client notifications: unit published / not published, favorite price drop, who is your advisor
        try {
            \App\Models\Unit::updated(function ($unit) { \App\Support\ClientNotify::unitUpdated($unit); });
            \App\Models\Lead::saved(function ($lead) { \App\Support\ClientNotify::leadSaved($lead); });
        } catch (\Throwable $e) {}

        // CRM reminders safety net: at most once a minute, after the response is sent
        if (!$this->app->runningInConsole()) {
            $this->app->terminating(function () {
                \App\Support\CrmSchema::ensure();
                \App\Support\CrmTicker::maybeRun();
            });
        }
    }
}
